const MetalRate = require("../models/metalRate");


const getMetalRate = async (req, res) => {
    // try {
    //     let metalRateList = await MetalRate.find()
    //     if (!metalRateList) {
    //         return res.status(404).json({ message: "No MetalRate Found" });
    //     }
    //     return res.status(200).json({ metalRateList });
    // }
    // catch (err) {
    //     res.status(500).json({ message: error.message });
    // }

    const { metal, purity, page = 1, limit = 5 } = req.query;
    const query = {};
    if (metal) query.metal = metal;
    if (purity) query.purity = purity;

    try {
        const rates = await MetalRate.find(query)
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await MetalRate.countDocuments(query);

        return res.status(200).json({ data: rates, total });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMetalRateById = async (req, res) => {
    try {
        const { id } = req.params;
        const metalRate = await MetalRate.findById(id);

        if (!metalRate) {
            return res.status(404).json({ message: "MetalRate not found" });
        }

        return res.status(200).json({ metalRate });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addMetalRate = async (req, res) => {
    const data = req.body
    try {
        const newMetalRate = new MetalRate(data);
        await newMetalRate.save();
        res.status(201).json(newMetalRate);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const updateMetalRate = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const updatedMetalRate = await MetalRate.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        if (!updatedMetalRate) {
            return res.status(404).json({ message: "MetalRate not found" })
        }
        return res.status(200).json({ updatedMetalRate });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const deleteMetalRate = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteMetalRates = await MetalRate.findByIdAndDelete(id);
        if (!deleteMetalRates) {
            return res.status(404).json({ message: "MetalRate not found" });
        }

        return res.status(200).json({ message: "Successfully Deleted" });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ message: "Unable to delete ! Please try again" });
    }
};

const getMetalRateLatest = async (req, res) => {
    const { metal, purity } = req.query;
    try {
        const latestRate = await MetalRate.findOne({ metal, purity }).sort({ rateDate: -1 });
        return res.status(200).json(latestRate);
    }
    catch (err) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getMetalRate, getMetalRateById, addMetalRate, updateMetalRate, deleteMetalRate, getMetalRateLatest };