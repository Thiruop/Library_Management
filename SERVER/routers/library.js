const express=require("express");
const router = express.Router();
const { Book, Member,Admin } = require('../models/schema');
router.get("/login/userverfication/books",async(req,res)=>{
    try{
        const libraryBooks=await Book.find({});
        if(libraryBooks){
            res.json(libraryBooks)
        }else{
            res.send("No Books Availabe")
        }
    }catch(error){
        res.status(500).send(error.message);
    }
})
router.get("/login/userverfication/books/:id",async (req, res) => {
    try {
      const id = req.params.id;
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({message: "Student not found"});
      }
      res.json(book)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });
router.post("/login/userverfication/books/edit/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.json(updatedBook)
    } catch (error) {
      
      res.status(500).json({message: error.message});
    }
  });
router.get("/login/userverfication/member",async(req,res)=>{
    try{
        const libraryMember=await Member.find({});
        if(libraryMember){
            res.json(libraryMember)
        }else{
            res.send("No Member details There")
        }
    }catch(error){
        res.status(500).send(error.message);
    }
})
router.get("/login/userverfication/member/:id",async (req, res) => {
    try {
      const id = req.params.id;
      const update = await Member.findById(id);
      if (!update) {
        return res.status(404).json({message: "Student not found"});
      }
      res.json(update)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });
  router.put("/login/userverfication/member/edit/:id", async (req, res) => {
    try {
        const memberId = req.params.id;
        const updateData = req.body;

        const updatedMember = await Member.findByIdAndUpdate(memberId, updateData, { new: true });

        res.json(updatedMember);
    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




  router.get("/login/userverfication/member/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await Member.findByIdAndDelete(id);
      res.send("data has been deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting the data");
    }
  });
router.post("/login/userverfication", async (req, res) => {
    const { name, email } = req.body; 
    try {
        const existingUser = await Member.findOne({ name, email });
        if (!existingUser || existingUser.email !== email) {
            return res.status(400).send("Invalid username, password, or user type");
        }
       res.json(existingUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post("/login/admin", async (req, res) => {
    const { name, email } = req.body; 
    try {
        const existingUser = await Admin.findOne({ name, email });
        if (!existingUser || existingUser.email !== email) {
            return res.status(400).send("Invalid username, password, or user type");
        }
       res.json(existingUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login/signup', async (req, res) => {
    const { id,name, email } = req.body;
    try {
        const existingUser = await Member.findOne({ name });
        

        if (existingUser && existingUser.email === email) {
            return res.status(400).json({ message: "Username already exists. Please choose a different one." });
        }
       
        await Member.create({ id,name,email })
        .then(employees =>res.json(employees))
        .catch(err=>res.json(err))
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;