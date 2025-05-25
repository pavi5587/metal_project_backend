const Purity = require("../models/purity");


const getPurity = async (req, res) => {
    try {
        let purityList = await Purity.find()
        if (!purityList) {
            return res.status(404).json({ message: "No Purity Found" });
        }
        return res.status(200).json({ purityList });
    }
    catch (err) {
        res.status(500).json({ message: error.message });
    }
}

const getPurityById = async (req, res) => {
    try {
        const { id } = req.params;
        const purity = await Purity.findById(id);

        if (!purity) {
            return res.status(404).json({ message: "Purity not found" });
        }

        return res.status(200).json({ purity });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addPurity = async (req, res) => {
    const data = req.body
    try {
        const newPurity = new Purity(data);
        await newPurity.save();
        res.status(201).json(newPurity);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const updatePurity = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const updatedPurity = await Purity.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        if (!updatedPurity) {
            return res.status(404).json({ message: "Purity not found" })
        }
        return res.status(200).json({ updatedPurity });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const deletePurity = async (req, res) => {
    const id = req.params.id;

    try {
        const deletePurityList = await Purity.findByIdAndDelete(id);
        if (!deletePurityList) {
            return res.status(404).json({ message: "Purity not found" });
        }

        return res.status(200).json({ message: "Successfully Deleted" });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ message: "Unable to delete ! Please try again" });
    }
};

module.exports = { getPurity, getPurityById, addPurity, updatePurity, deletePurity };