const execSQL = require('./maria').execQuery
const responser = require('./responser')

const staffMVP = (req, res) => { //พนักงานที่ขายของเยอะสุด
  let sql = `SELECT 
    s.staffNo,
    s.firstname,
    s.lastname,
    SUM(productbills.price) as "num"
  FROM
  staffs s
  join bills b on s.staffNo = b.staffNo
  join productbills on b.billNo = productbills.billNo
  WHERE
  b.dateOfBill BETWEEN "${req.body.data.start}" AND "${req.body.data.end}"
  GROUP BY
  1,
    2,
    3
  HAVING
  SUM(productbills.price) = (
    SELECT 
			MAX(b.totalSale)
  FROM
    (
    SELECT 
					SUM(price) as "totalSale" 
				FROM 
					bills bi 
					join staffs on bi.staffNo = staffs.staffNo 
          join productbills on productbills.billNo = bi.billNo 
        WHERE
          bi.dateOfBill BETWEEN "${req.body.data.start}" AND "${req.body.data.end}"
				GROUP BY 
					bi.staffNo
    ) b
	)`
  // console.log(sql)
  execSQL(sql)
    .then((rows) => {
      console.log(rows)
      responser.ok(res, rows[0])
    })
    .catch((err) => {
      console.log(err)
      responser.bad(res, err)
    })
}

const priceSum = (req, res) => { //For หายอดขายในแต่ละวันหรือวันที่ส่งมา
  let obj = req.body;
  let start = obj.data.start
  let end = obj.data.end
  let sql = "Select SUM(price) FROM productbills pb join bills b on pb.billNo = b.billNo where b.dateOfBill BETWEEN \'" + start + "\'AND\'" + end + "\'"
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows[0])
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

const bestSellid = (req, res) => { //หาที่ขายดีสุดหาตาม id 
  let column = req.params.column
  let id = req.params.id
  let date = req.param.date
  let sql = 'Select p.productNo, p.productName, p.productTypeNo from product p join producttype pt on pt.productTypeNo = p.productTypeNo WHERE EXISTS ( SELECT pb.productNo from productbills pb join bills b on pb.billNo = b.billNo RIGHT join members m on m.memberNo = b.memberNo Right join staffs s on s.staffNo = b.staffNo where' + column + '=' + id + 'and b.dateOfBill LIKE \'' + date + '\' and p.productNo = pb.productNo'
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

const whoTheBoss = (req, res) => {
  let sql = 'Select DISTINCT b.* from staffs s right join staffs b on s.supervisorNo = b.staffNo where b.supervisorNo is Null'
  execSQL(sql)
    .then((rows) => {
      responser.ok(res, rows)
    })
    .catch((err) => {
      responser.bad(res, err)
    })
}

module.exports = {
  staffMVP,
  priceSum,
  bestSellid,
  whoTheBoss
}