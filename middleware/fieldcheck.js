const fieldcheck = (req, res, next) => {
  const { email, password, city, age } = req.body;
  if (!email || !password || !city || !age) {
    res.status(400).send({ msg: "All Field must present" });
  } else {
    next();
  }
};
module.exports = fieldcheck;
