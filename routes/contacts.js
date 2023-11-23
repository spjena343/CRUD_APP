const express = require("express");
const { createContact, getContact, updateContact, deleteContact } = require("../controllers/contacts");
const router = express.Router();

router.route("/createContact").post(createContact);
router.route("/getContact").post(getContact);
router.route("/updateContact").post(updateContact);
router.route("/deleteContact").post(deleteContact);



module.exports = router;
