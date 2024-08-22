import Article from "../models/Article.js";

const createService = (body) => Article.create(body);

const findAllService = () => Article.find();

const findByIdService = (id) => Article.findOne({ _id: id });

const deleteService = (id) => Article.findByIdAndDelete(id);

const updateService = (id, updateData) =>
    Article.findOneAndUpdate(
      { _id: id },
      updateData
    );

export default {
  createService,
  findAllService,
  deleteService,
  updateService,
  findByIdService
};
