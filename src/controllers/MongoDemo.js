
var Model = require('../models/MongoDemo');

// 要顯示跟隱藏的欄位
const fields = 'name type michelin parking delivery deposit review location -_id'

/**
 * List
 * 列出所有資料
 */
exports.list = (req, h) => {
  if (JSON.stringify(req.query)=='{}') {
    // 沒有參數
    return Model.find().select(fields).exec().then((demo) => {
        return demo;
      }).catch((err) => {
        return { err: err };
      });
  } else {
    // 有參數
    return Model.find({name: req.query.name}).select(fields).exec().then((demo) => {
      return demo;
    }).catch((err) => {
      return { err: err };
    });
  }
}

/**
 * Get Demo by ID
 */
exports.get = (req, h) => {
  return Model.findById(req.params.id).exec().then((demo) => {
    if (!demo) return { message: 'Demo not Found' };
    return { demos: demo };
  }).catch((err) => {
    return { err: err };
  });
}


/**
 * POST a Demo
 */
exports.create = (req, h) => {
  const demoData = {
    name: req.payload.name,
    age: req.payload.age
  };
  return Model.create(demoData).then((demo) => {
    return { message: "Demo created successfully", demo: demo };
  }).catch((err) => {
    return { err: err };
  });
}

/**
 * PUT | Update Demo by ID
 */
exports.update = (req, h) => {
  return Model.findById(req.params.id).exec().then((demo) => {
    if (!demo) return { err: 'Demo not found' };
    demo.name = req.payload.name;
    demo.breed = req.payload.breed;
    demo.age = req.payload.age;
    demo.image = req.payload.image;
    demo.save(dogData);
  }).then((data) => {
    return { message: "Demo data updated successfully" };
  }).catch((err) => {
    return { err: err };
  });
}

/**
 * Delete 資料 by ID
 */
exports.remove = (req, h) => {

  return Model.findById(req.params.id).exec(function (err, demo) {
    if (err) return { dberror: err };
    if (!demo) return { message: 'Demo not found' };
    demo.remove(function (err) {
      if (err) return { dberror: err };
      return { success: true };
    });
  });
}
