app.post("/api/AddProductToBag", async function (req, res) {
  // console.log(req.body);
  return await function () {
    product = req.body.produktid;
    if (req.session.bag) {
      var koszyk = JSON.parse(req.session.bag);
      koszyk.push(product);
      req.session.bag = JSON.stringify(koszyk);
      res.cookie("koszyk", JSON.stringify(koszyk));
      res.status(200).send("Produkt dodany do koszyka");
    } else {
      var koszyk = [product];
      req.session.bag = JSON.stringify(koszyk);
      res.cookie("koszyk", JSON.stringify(koszyk));
      res.status(200).send("Produkt dodany do koszyka");
    }
  };
});
