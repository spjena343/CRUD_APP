const axios = require("axios");
const { db } = require("../config/config");

exports.createContact = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile_number, data_store } =
      req.body;

    if (data_store === "CRM") {
      const response = await axios.post(
        "https://domain.myfreshworks.com/crm/sales/api/contacts",
        {
          contact: {
            first_name,
            last_name,
            email,
            mobile_number,
          },
        },
        {
          headers: {
            Authorization: `Token token=${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Contact created in CRM", data: response.data });
    } else if (data_store === "DATABASE") {
      db.query(
        "INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)",
        [first_name, last_name, email, mobile_number],
        (error, results, fields) => {
          if (error) throw error;
         return res.json({ message: "Contact created in DATABASE" });
        }
      );
    } else {
      return res.status(400).json({ error: "Invalid data_store parameter" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getContact = async (req, res) => {
  try {
    const { contact_id, data_store } = req.body;
    if (data_store === "CRM") {
        const response = await axios.get(`https://domain.myfreshworks.com/crm/sales/api/contacts/${contact_id}?include=sales_accounts`, {
            headers: {
              'Authorization': `Token token=${process.env.API_KEY}`,
              'Content-Type': 'application/json',
            },
          });
        return res.status(200).json({ message: 'Contact retrieved from CRM', data: response.data });
    } else if (data_store === "DATABASE") {
      db.query(
        "SELECT * FROM contacts WHERE id = ?",
        [contact_id],
        (error, results, fields) => {
          if (error) throw error;
         return res.json({
            message: "Contact retrieved from DATABASE",
            contact: results[0],
          });
        }
      );
    } else {
      return res.status(400).json({ error: "Invalid data_store parameter" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    if (data_store === "CRM") {
        const response = await axios.put(`https://domain.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, {
            contact: {
              mobile_number: new_mobile_number,
              custom_field: { cf_is_active: false },
            },
          }, {
            headers: {
              'Authorization': `Token token=${process.env.API_KEY}`,
              'Content-Type': 'application/json',
            },
          });
         return res.status(200).json({ message: 'Contact updated in CRM', data: response.data });
    } else if (data_store === "DATABASE") {
      db.query(
        "UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?",
        [new_email, new_mobile_number, contact_id],
        (error, results, fields) => {
          if (error) throw error;
          return res.json({ message: "Contact updated in DATABASE" });
        }
      );
    } else {
      return res.status(400).json({ error: "Invalid data_store parameter" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { contact_id, data_store } = req.body;

    if (data_store === "CRM") {
      await axios.delete(`https://domain.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, {
        headers: {
          'Authorization': `Token token=${process.env.API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
     return res.status(200).json({ message: 'Contact deleted in CRM' });
    } else if (data_store === "DATABASE") {
      db.query(
        "DELETE FROM contacts WHERE id = ?",
        [contact_id],
        (error, results, fields) => {
          if (error) throw error;
        return  res.json({ message: "Contact deleted from DATABASE" });
        }
      );
    } else {
    return res.status(400).json({ error: "Invalid data_store parameter" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
