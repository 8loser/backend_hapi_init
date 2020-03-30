
var Model = require('../models/MongoDemo');

/**
 * List
 * 查詢資料，多參數使用 交集 (AND)
 * 如果 greed=true，使用聯集 (OR)
 */
exports.list = (req, h) => {
  // 搜尋條件
  var condition = {}
  // 不同條件式
  // 星期幾
  if (req.query.day) {
    // 列出該日有營業（day!=Closed）的店家
    const day = req.query.day
    condition[day] = { $ne: 'Closed' }
    // 如果有open、clsoe時間參數，加上時間條件
    // TODO 這裡有bug
    // 開業時間
    if (req.query.open){
      condition[day+'.open'] = { $lte: req.query.open }
    }
    // 歇業時間
    if (req.query.close){
      // 歇業時間如果跨日，要特別處理
      if (req.query.close>req.query.open){
        condition[day+'.close'] = { $gte: req.query.close }
      } else {
        // 跨日
        condition[day+'.close'] = { $lte: req.query.close }
      }
    }
  }
  // 類型
  if (req.query.type) {
    condition['type'] = req.query.type
  }
  // 米其林
  if (req.query.michelin) {
    // 如果是數值，須要轉成數值不然查詢不到資料
    condition['michelin'] = parseInt(req.query.michelin)||req.query.michelin
  }
  // 停車
  if (req.query.parking) {
    condition['parking'] = req.query.parking
  }
  // 外送
  if (req.query.delivery) {
    condition['delivery'] = req.query.delivery
  }
  // 先繳訂金
  if (req.query.deposit) {
    condition['deposit'] = req.query.deposit
  }
  // 地理位置
  if (req.query.longitude || req.query.latitude) {
    condition = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              req.query.longitude, //longitude: -180~180
              req.query.latitude   //latitude: -90~90
            ]
          },
          $minDistance: 0,
          $maxDistance: 100000
        }
      }
    }
  }

  // 如果greed=true，使用聯集搜尋
  if (req.query.greed) {
    var greedArray = Object.keys(condition).map(function (key) {
      var obj = {}
      obj[key] = condition[key]
      return obj
    });
    condition = { $or: greedArray }
  }

  // 分頁參數設定
  var paginOptions = {
    // 要顯示跟隱藏的欄位
    select: '-_id name mon tue wed thu fri sat sun delivery deposit michelin parking review location',
    // sort: { date: -1 },
    // lean:true,
    limit: Number(req.query.limit)||10,
    page: Number(req.query.page)||1
  };

  // 使用分頁查詢查詢Mongodb
  return Model.paginate(condition, paginOptions, function(err, result) {
    return result
  }).catch((err)=>{
    return { err: err };  
  });

  // 查詢Mongodb
  // 要顯示跟隱藏的欄位
  // const fields = 'name type michelin parking delivery deposit review location -_id'
  // return Model.find(condition).select(fields).exec().then((demo) => {
  //   return demo;
  // }).catch((err) => {
  //   return { err: err };
  // });
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
