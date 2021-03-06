const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  sizes: [{ type: Schema.Types.ObjectId, ref: 'Sizes' }],
  colors: [{ type: Schema.Types.ObjectId, ref: 'Colors' }],
  kind: {
    type: String,
    enum: ['men', 'women']
  }
}, {
  timestamps: true,
});

shoeSchema.statics.findShoe = function ({ kind, q }) {
  let query = {};
  if (!!kind) query['kind'] = kind;
  if (!!q) query['slug'] = { $regex: new RegExp(q, 'gi') };
  return ShoeModel.find(query)
    .populate({ path: 'category' })
    .populate({ path: 'sizes' })
    .populate({ path: 'colors' })
    .exec();
}

shoeSchema.statics.findShoeByCatId = function (catId) {
  return ShoeModel.find({ category: catId });
}

shoeSchema.statics.findShoeById = function (id) {
  return ShoeModel.findById(id)
    .populate({ path: 'category' })
    .populate({ path: 'sizes' })
    .populate({ path: 'colors' })
    .exec();
}

const ShoeModel = mongoose.model('Shoes', shoeSchema);
module.exports = ShoeModel;
