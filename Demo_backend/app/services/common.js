// const { Types } = require("mongoose");


const create = async (Model, profile) => {
  try {
    const data = new Model(profile).save();
    return data;
  } catch (err) {
    return false;
  }
};


const updateByCondition = async (Model, condition, content) => {
  try {
    const data = await Model.updateOne(condition, { $set: content });
    return data;
  } catch (err) {
    return false;
  }
};

const getById = async (Model, id) => {
  try {
    //console.log(id);
    const data = await Model.findById(id).lean();
    return data;
  } catch (error) {
    return false;
  }
};

const getByCondition = async (Model, condition) => {
  try {
    const data = await Model.findOne(condition).lean()
    return data ? data : null;
  } catch (error) {
    return false;
  }
}

const removeById = async (Model, id) => {
  try {
    console.log(id);
    const data = await Model.findByIdAndRemove(id);
    return data;
  } catch (error) {
    return false;
  }
};

const updateById = async (Model, id, profile) => {
  try {
    const data = await Model.findByIdAndUpdate(
      Types.ObjectId(id),
      { $set: profile },
      { new: true }
    );
    return data;
  } catch (error) {
    return false;
  }
};


const insertManyData = async (Model, content) => {
  try {
    //console.log("inside insert many fnc", content);
    const data = Model.insertMany(content);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (err) {
    return false;
  }
};

const deleteByField = async (Model, content) => {

  try {
    console.log(content);
    const data = await Model.findOneAndRemove(content);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    return false;
  }

}
const count = async (Model, condition) => {
  try {
    const data = await Model.countDocuments(condition);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    return false;
  }
}

module.exports = {
  create,
  updateByCondition,
  getById,
  removeById,
  updateById,
  count,
  insertManyData,
  deleteByField,
  getByCondition
};
