const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../model/Note");
const { body, validationResult } = require("express-validator");

// 1. ROUTE: POST "/api/notes/fetchallnotes
// Get loggedin user's all notes. Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server Error at GET ROUTE" });
    }
});

// 2. ROUTE: POST "/api/notes/addnotes"
// Add a new notes. Login Required
router.post( 
  "/addnotes",[
    (body("title", "Enter valid Title").isLength({ min: 1 }),
    body("description", "Description must be atleast 5 characters.").isLength({min: 1}))
  ], fetchuser ,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return Bad requesrt and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title, description, tag, user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server Error" });
    }
  }
);

// 3. ROUTE: PUT "/api/notes/updatenote/:id" 
// Update an existing Notes using. Login Required
router.put( 
    "/updatenote/:id", fetchuser, async (req, res) => {
      try {
        const { title, description, tag } = req.body;

        //Create a new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and updte it
        let note = await Note.findById(req.params.id);

        // If Note id of user and params.id is not match then
        if(!note){ return res.status(404).send("Not Found")}

        // check user is same or not
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not allowes")
        } 

        note = await Note.findByIdAndUpdate(req.params.id , {$set:newNote}, {new:true})
        res.json({note})

      } catch (error) { 
        console.log(error);
        res.status(500).json({ error: "Internal server Error" });
      }
    }
  );

// 4. ROUTE: DELETE "/api/notes/deletenote/:id"
// Delete an existing Notes. Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

        try{
        //Find the note to be updated and updte it
        let note = await Note.findById(req.params.id);

        // If Note id of user and params.id is not match then
        if(!note){ return res.status(404).send("Not Found")}
        // check user is same or not
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not allowes")
        } 
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note hase been deleted", note:note})

        
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error: "Internal server Error at DELETE route" });
    }
})
 
module.exports = router;
