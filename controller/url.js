const Url  = require("../model/url")

const createShortUrl = async (req, res) => {
    const { originalurl } = req.body;

    try {
        const url = await Url.findOne({ originalurl });
        if (url) {
            return res.status(200).render( "home" , { shorturl: `http://localhost:8000/${url.shorturl}` });
        }

        const newUrl = await Url.create({ originalurl });
        await newUrl.save();
        return res.status(201).render("home" , { shorturl: `http://localhost:8000/${newUrl.shorturl}` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

const redirectShortUrl = async (req , res) =>{
       try{
       const url = await Url.findOne({ shorturl : req.params.shorturl});
       if(url){
        url.clicks++;
        await url.save();
         return res.redirect(url.originalurl)
        

       }
       else{
        res.status(404).send('URL not found');
       }
       
    }
    catch(err){
       console.error(err);
       res.status(500).send('Server Error');
   }
   
   }


   module.exports = {
    redirectShortUrl,
    createShortUrl,
  };
  