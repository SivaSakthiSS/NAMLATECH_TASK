const exp = require("express");
const pool = require("./db");
const multer  = require("multer");
const path = require("path");
const fs = require("fs");
const cors  = require("cors");

const app = exp();
const port = 5000;

app.use(cors());
app.use(exp.json());
app.use("/uploads", exp.static(path.join(__dirname,"uploads")));

//multer storage set up
const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{cb(null, uploadFolder)},
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({
    storage: storage
});


app.get("/", (req, res) =>{
    res.send("hotel form running sucessfully");
});

//post reques

app.post("/api/hotels", upload.single("image"), async(req, res) =>{
    try{
        const{title, description,latitude, longitude, price

        } = req.body;

        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const result = await pool.query(
            `insert into hotels
            (image,title, description,latitude, longitude, price)
            values($1,$2,$3,$4,$5,$6)
            returning *`,
            [image,title, description, latitude, longitude, price ]
        );

        res.status(201).json(result.rows[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "hotel could not added"});
    }
});

//get API request

app.get("/api/hotels", async (req, res) => {
    try {
        const search = req.query.search || "";
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const page = Number(req.query.page) || 1;
        const limit = 6;
        const offset = (page - 1) * limit;

        let where = "where 1=1";
        let values = [];
        let count = 1;

        if (search) {
            where += ` AND title ILIKE $${count}`;
            values.push(`%${search}%`);
            count++;
        }
        if (minPrice) {
            where += ` AND price >= $${count}`;
            values.push(minPrice);
            count++;
        }
        if (maxPrice) {
            where += ` AND price <= $${count}`;
            values.push(maxPrice);
            count++;
        }

        const result = await pool.query(`select * from hotels ${where}
            order by id desc
            limit ${limit}
            offset ${offset}`, values
        );
        const countResult =await pool.query(`select count(*) from hotels ${where}`, 
            values
        );

        const total = Number(countResult.rows[0].count);
       

        res.json({
            page: page,
            limit: limit,
            total: total,
            hotels: result.rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hotels could not be fetched" });
    }
});

app.get("/api/hotels/:id", async(req, res) =>{
    try{
        const {id} = req.params;
        const result= await pool.query("select * from hotels where id = $1", [id]);
        
        if(result.rows.length === 0){
            return res.status(400).json({message: "not found"});
        }
         res.json(result.rows[0]);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "hotel not fetched"})
        }
    });
       

//put request
app.put("/api/hotels/:id",upload.single("image"), async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,description,latitude,longitude,price         
        }= req.body;

        const oldHotel = await pool.query(
            "select * from hotels where id = $1",
            [id]
        );

        if (oldHotel.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        let image = oldHotel.rows[0].image;

        if (req.file) {
            image = `/uploads/${req.file.filename}`;

            if (oldHotel.rows[0].image) {
                const oldImage = path.join(
                    __dirname,
                    oldHotel.rows[0].image
                );

                if (fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage);
                }
            }
        }
        const result = await pool.query(
            `update hotels 
            set image=$1, title = $2,description = $3,latitude = $4,longitude = $5,price= $6
            where id = $7 returning *`,
            [image,title, description, latitude, longitude, price, id]

        );

        res.status(200).json(result.rows[0]);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "hotel could not be updated"});
    }
});

// delete request

app.delete("/api/hotels/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "select * from hotels where id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }
        const image = result.rows[0].image;
        await pool.query("delete from hotels where id = $1",
            [id]
        );
         if (image) {
            const imagePath = path.join(__dirname, image);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({
            message: "Hotel deleted successfully",
            hotel: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Hotel could not be deleted"
        });
    }
});

app.listen(port, () =>{
    console.log(`server running on port ${port}`);
});
