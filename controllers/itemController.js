const Item = require('../models/Item');

exports.getItems = async (req, res) => {
    try {
        if (!req.user?.userId) return res.status(401).json({ message: 'Unauthorized' });

        const items = await Item.find({ user: req.user.userId });
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createItem = async (req, res) => {
    try {
        if (!req.user?.userId) return res.status(401).json({ message: 'Unauthorized' });

        const item = new Item({
            ...req.body,
            user: req.user.userId,
        });

        await item.save();
        res.status(201).json(item);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        if (!req.user?.userId) return res.status(401).json({ message: 'Unauthorized' });

        const item = await Item.findOne({ _id: req.params.id, user: req.user.userId });
        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        if (!req.user?.userId) return res.status(401).json({ message: 'Unauthorized' });

        const item = await Item.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json(item);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        if (!req.user?.userId) return res.status(401).json({ message: 'Unauthorized' });

        const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
