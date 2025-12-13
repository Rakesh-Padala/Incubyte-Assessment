import Sweet from "../models/sweet.model.js";

/**
 * @desc   Create a new sweet (Admin only)
 */
export const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      sweet,
    });
  } catch (error) {
    console.error("Create sweet error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc   List all active sweets
 */
export const listSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find({ isActive: true });

    return res.status(200).json({
      success: true,
      sweets,
    });
  } catch (error) {
    console.error("List sweets error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) {
      query.name = new RegExp(name, "i");
    }

    if (category) {
      query.category = new RegExp(category, "i");
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const sweets = await Sweet.find(query);

    return res.status(200).json({
      success: true,
      sweets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



/**
 * @desc   Purchase a sweet
 */
export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Purchase quantity must be greater than zero",
      });
    }

    const sweet = await Sweet.findOne({ _id: id, isActive: true });

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    return res.status(200).json({
      success: true,
      message: "Sweet purchased successfully",
      sweet,
    });
  } catch (error) {
    console.error("Purchase sweet error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
