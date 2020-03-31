
const { Restaurant, BussinessHours } = require('../utility/sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

/**
 * List
 */
exports.list = (req, h) => {

  // 搜尋條件
  var condition = {}
  // 營業時間條件
  var bussinessHoursCondition = {}

  // 星期幾
  if (req.query.day) {
    // 列出該日有營業（day!=Closed）的店家
    const day = req.query.day
    bussinessHoursCondition[day+'_open'] = { [Op.ne]: null }
    // 如果有open、clsoe時間參數，加上時間條件
    // 開業時間
    if (req.query.open){
      bussinessHoursCondition[day+'_open'] = { [Op.lte]: req.query.open }
    }
    // 歇業時間
    if (req.query.close){
      // 歇業時間如果跨日，要特別處理
      // TODO 這裡有bug
      // 開業時間
      if (req.query.close>req.query.open){
        bussinessHoursCondition[day+'_close'] = { [Op.gte]: req.query.close }
      } else {
        // 跨日
        bussinessHoursCondition[day+'_close'] = { [Op.lte]: req.query.close }
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
    condition['michelin'] = req.query.michelin
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

  // TODO 星期幾、地理位置

  // 如果greed=true，使用聯集搜尋
  if (req.query.greed) {
    var greedArray = Object.keys(condition).map(function (key) {
      var obj = {}
      obj[key] = condition[key]
      return obj
    });
    condition = { [Op.or]: greedArray }
  }

  // pagin功能
  // 每頁資料筆數
  var limit = 10
  if (req.query.limit) {
    limit = Number(req.query.limit)
  }
  // 偏移
  var offset = 0
  if (req.query.page) {
    offset = (Number(req.query.page) - 1) * limit
  }

  // 關聯營業時間表(Bussiness_hours)
  Restaurant.hasOne(BussinessHours, { foreignKey: 'id' })
  // 執行查詢
  return Restaurant.findAndCountAll({
    where: condition,
    // 分頁參數
    offset: offset, limit: limit,
    include: {
      model: BussinessHours,
      where: bussinessHoursCondition
    }
  }).then(Restaurant => {
    return Restaurant
  }).catch(err => {
    return { err: err }
  })
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
