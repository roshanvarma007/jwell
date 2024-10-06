const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const multer = require("multer")
const cookieSession = require('cookie-session')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require('./schema/UserSchema')
const Review = require('./schema/ReviewSchema')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const axios = require('axios')
const { sendmail } = require('./sendOtp')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt')
const leonardoai =  require('@api/leonardoai');
const path = require('path')
const fs = require('fs')
require('./passport')
require("./db")
const Razorpay = require('razorpay'); 
const { v4: uuidv4 } = require('uuid');
const { sendToken } = require('./sendToken')
const {sendSubscription} = require("./sendSubscription")
const Blog = require('./schema/BlogSchema')
const Contact = require('./schema/ContactSchema')
const { errorMonitor } = require('stream')
const { uploadMultiple } = require('./middlware/imageUploader')

// This razorpayInstance will be used to
// access any resource from razorpay

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "public/")
//     },
//     filename: (req,file,cb) =>{
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary config
cloudinary.config({
    cloud_name: "disb0qkhr",
    api_key: "965223264892684",
    api_secret: "U_vXLOAlOxBFiJNLdW5WepoYjjs",
  });

// Cloudinary storage setup for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name', // Specify the folder in Cloudinary
    format: async (req, file) => 'png', // Support formats like jpg, png, etc.
    public_id: (req, file) => file.originalname.split('.')[0], // Use original filename as public ID
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Route for handling image upload


const razorpayInstance = new Razorpay({
    // Replace with your key_id
    key_id: "rzp_live_9YDNdvLxBLmTAZ",
    // Replace with your key_secret
    key_secret: "PCfeCF3NKFQCIRwWIRBzwtQX"
});

let otp
let imageId
const RAZORPAY_KEY_ID = "rzp_live_9YDNdvLxBLmTA"
const RAZORPAY_KEY_SECRET = "PCfeCF3NKFQCIRwWIRBzwtQX"


// cloudinary.config({
//     cloud_name: "disb0qkhr",
//     api_key: "965223264892684",
//     api_secret: "U_vXLOAlOxBFiJNLdW5WepoYjjs",
//   });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


// initialiePassport(passport);
passport.use(new LocalStrategy({
    usernameField: 'email',  // Using 'email' instead of 'username'
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isMatch = await bcrypt.compare(password,user.password)
        console.log(isMatch)
        if(isMatch){
            console.log("check")
            console.log(user)
            return done(null, {type: user, logtype: "login"})
        }else{
            return done(null, false, { message: 'login failed.' });

        }
    } catch (err) {
        console.log("err")
        return done(err);
    }
}));

passport.serializeUser((user,done)=>{
    done(null, user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})


app.use(cors({
    origin: 'https://server-ten-orcin.vercel.app',  // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, auth headers, etc.)
    sameSite: 'secure'
}));


app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://server-ten-orcin.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204); // No Content
});




app.use(cookieSession({
    name: "googleauthsession",
    keys: ["key1", "key2"],
    saveUninitialized: false,
    expires: new Date(Date.now() + (60 * 24 * 3600000)),
    resave: false,
    cookie: {
        secure: false,  // Set to true in production if using HTTPS
        httpOnly: true,
        sameSite: 'none'  // Allow cross-origin requests
    }
}))

app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json())

// Other middleware and routes...

app.post("/uploads", uploadMultiple, (req,res)=>{
    res.status(200).send({
        message: "file uploaded successfully",
        data: req.files, 
        success: true

    })
})

app.get('/', (req, res) => {
    res.send(
        "<button><a href='/auth'>Login with google</a></button><br/><button><a href='/linkedin'>Login with linkedin</a></button> <br /> <button><a href='/logout'>Logout</a></button>"
    )
})

app.get('/auth', passport.authenticate('google', {
    scope: ["email", "profile"]
}))

app.get('/linkedin', passport.authenticate('linkedin'));




app.get('/auth/callback', passport.authenticate("google", {
    successRedirect: "/linkedin/success",
    failureRedirect: "/linkedin/failure"
})
);
app.get('/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: "https://server-ten-orcin.vercel.app/",
    failureRedirect: "/linkedin/failure"
}))

let token

app.get('/linkedin/success', (req, res) => {
    // if (!req.user) {
    //     res.redirect("/linkedin/failure")
    // // }
     token = jwt.sign({ id: req.user, data: "data" }, 'your-secret-key', {
        expiresIn: '1d' // Token expiry (e.g., 1 day)
    });
    // console.log(req)

    res.redirect(`https://server-ten-orcin.vercel.app/`)
    // res.redirect(`/data`)
    // res.status(200).send({token})

})

app.get('/linkedin/failure', (req, res) => {
    res.status(404).send("Error")
})

app.post('/upload', upload.single('image'), (req, res) => {
    try {
      // File has been uploaded to Cloudinary at this point
      console.log(req.file); // The file info stored in Cloudinary
  
      res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: req.file.path, // The URL of the uploaded file on Cloudinary
      });
    } catch (error) {
      console.error('Error during upload:', error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  });
  


app.post("/verify-token",async(req,res)=>{
    const {token} = req.body
    const user = await jwt.verify(token, 'your-secret-key')
    
    res.status(200).send({user})
})

// success

app.get("/data", (req, res) => {
    // console.log("check",req.user)
    // const {token} = req.params
    const tkens = token
    res.status(200).send({token: tkens })
    token = null
    // res.redirect("https://server-ten-orcin.vercel.app/")
})

app.get("/userid/:email", async (req, res) => {
    const { email } = req.params;

    const userData = await User.findOne({ email })

    if (userData) {
        res.status(200).json({ success: true, msg: "user found", userData })
    }
    else {
        res.status(202).json({ success: false, msg: "user not found !" })
    }
})

app.post("/update-user/:id", async (req, res) => {
    const { id } = req.params

    await User.findOneAndUpdate({ id }, req.body).then(() => {
        res.status(200).send("user updated successfully")
    }).catch((err) => {
        res.status(404).send(err)
    })

})

app.post("/send-otp", async(req,res)=>{

    try{
        const {email} = req.body;
        const user = await User.findOne({email});
    
        if(!user){
            res.status(200).send({msg:"invalid Email"});
        }else{
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            console.log(`otp from mail side :- ${otp}`);
             sendmail(otp, email);
            res.status(200).send({msg: user._id, otp})
        }
    }catch(err){
        res.status(404).send(err)
    }
   
})

app.post("/verfiy-otp", async(req,res)=>{
    const {userOtp} = req.body;
    if(userOtp==otp){
          success = true;
          console.log(success);  
       res.status(200).send({success})
       otp = null
    }else{
        console.log("invalid otp");
        res.status(200).send({msg: "invalid otp"});
    }
})

app.get('/auth/callback/success', (req, res) => {
    if (!req.user) {
        res.redirect("/auth/callback/failure")
    }
    // console.log(req.user)
    res.status(200).send(req.user)
})

app.post('/setinfo/:id', async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, password, phone, country } = req.body

    res.setHeader("Access-Control-Allow-Credentials", "*")
    res.setHeader("Access-Control-Allow-Origin", "https://server-ten-orcin.vercel.app");

    const hashedPss = await bcrypt.hash(password, 10)


    await User.findOneAndUpdate({ id }, { firstName, lastName, password: hashedPss, phone, country }).then((e) => {
        res.status(200).json({ success: true, info: e })
    }).catch((err) => {
        console.log(err)
    })

})

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('https://server-ten-orcin.vercel.app/login')
    });
})

app.post("/register",async (req,res)=>{
    const {email,profile,country,firstName,lastName,phone, password} = req.body
    const ids = uuidv4();

    

    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(404).send({success: false, msg: "user already exist"})
    }

    const hashedPss = await bcrypt.hash(password, 10)

   const userData =  await User({name: "manualUser",email,profile,id: ids,provider: "manual",country,firstName,lastName,phone, password: hashedPss})

   await userData.save()

   res.status(200).json({success: true, msg: "user saved successfully", logtyp: "register"})

})


app.post('/manual-login', (req, res, next) => {
    try{
        res.setHeader("Access-Control-Allow-Methods", "*")
        console.log('Request received on /manual-login');  // Debug log to see if route is hit
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                console.log('Error during authentication:', err);  // Log errors
                return next(err);
            }
            if (!user) {
                console.log('invalid credentials:', info.message);  // Log failure reason
                return res.redirect('/login/failure');
            }
            req.logIn(user, function(err) {
                if (err) {
                    console.log('Error during login:', err);  // Log login error
                    return next(err);
                }
                token = jwt.sign({ id: req.user, data: "data" }, 'your-secret-key', {
                    expiresIn: '1d' // Token expiry (e.g., 1 day)
                });
                console.log('Authentication successful');  // Log success
               return res.status(200).send({msg: "logged", user: req.user, token})
            });
        })(req, res, next);
    }catch(err){
        console.log(err)
    }
});


app.post('/verified/:email', async (req,res)=>{
    const {email} = req.params
    await User.findOneAndUpdate({email}, {verified: true}).then(()=>{
        res.status(200).send({msg: "user verified"})
    }).catch((err)=>{
        console.log(err)
    })
});

// Login failure route
app.get('/login/failure', (req, res) => {
    res.status(401).send("Login failed");
});

app.get("/cookie",(req,res)=>{
    res.status(200).json({ regsiteration: "resgister"});
})

app.post("/text",async (req,res)=>{
    const {msg, noImG, email} = req.body
   
leonardoai.auth('80849ed3-cfad-4f6e-b241-8b15cf35178a');
leonardoai.createGeneration({
//   alchemy: true,
//   height: 768,
//   modelId: '6b645e3a-d64f-4341-a6d8-7a3690fbf042',
  num_images: Number(noImG),
//   presetStyle: 'DYNAMIC',
  prompt: msg,
//   width: 1024
modelId: "6b645e3a-d64f-4341-a6d8-7a3690fbf042",
  contrast: 3.5,
//   prompt: "an orange cat standing on a blue basketball with the text PAWS",
//   num_images: 4,
  width: 1472,
  height: 832,
  ultra: true,
  styleUUID: "111dc692-d470-4eec-b791-3475abac4c46",
  enhancePrompt: true
})
  .then(async({ data }) => {

    console.log(data.sdGenerationJob.generationId)

    await User.findOneAndUpdate({email}, {id: data.sdGenerationJob.generationId}).then(()=>{
        console.log("id stored successfully")
        res.status(200).send({data: "id stored successfully"})
    }).catch((err)=>{
        console.log("err in updating",err)
    })
  }
   

)
  .catch(err => 
  {
    res.status(200).send(err)
  }
  );
})


app.get("/re",async(req,res)=>{

    const id = await User.findOne({email: "khansaif86783@gmail.com"})

    console.log("from id",id.id)
    const ids = id.id

leonardoai.auth('80849ed3-cfad-4f6e-b241-8b15cf35178a');
let statu = "PENDING"
// while(statu === "PENDING"){
    console.log(statu, "epep")
    leonardoai.getGenerationById({id: ids})
    .then(({ data }) => {
        // console.log({id})
        console.log(data.generations_by_pk.status)
    
         statu = data.generations_by_pk.status
         console.log(statu)
    
        if(data.generations_by_pk.status=="COMPLETE"){
          statu = "COMPLETE"
        }
    
        // if(data.status)
        res.status(200).json({data})
    }
    )
    .catch(err => console.error(err));
// }

})

const api_Key = "80849ed3-cfad-4f6e-b241-8b15cf35178a";
const authorization = `Bearer ${api_Key}`;            
const headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": authorization
};
const urlInit = "https://cloud.leonardo.ai/api/rest/v1/init-image";
const imageFilePath = path.join(__dirname, 'img', 'blog1.jpg')
const payloadInit = { "extension": "jpg" };
app.post("/imgs", async(req,res)=>{
        
        
        // Get a presigned URL for uploading an image
        
        
        fetch(urlInit, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payloadInit)
        })
        .then(response => {
            console.log("init status",response.status);
            return response.json();
        })
        .then(data => {
            console.log("init image", data)
            
            const fields = JSON.parse(data.uploadInitImage.fields);
            const urlUpload = data.uploadInitImage.url;
            imageId = data.uploadInitImage.id; // For getting the image later
        
            const imageFilePath = path.join(__dirname, 'img', 'blog1.jpg')
            const fileStream = fs.createReadStream(imageFilePath);
        
            const formData = new FormData();
            Object.keys(fields).forEach(key => {
                formData.append(key, fields[key]);
            });
            formData.append('file', fileStream);
        

            console.log("field", formData)

            return fetch(urlUpload, {
                method: 'POST',
                body: formData
            });
        })
        .then(response => {
            console.log("upload url",response);
            return response;
        })
        .then(() => {
            // Generate with an image prompt
            const urlGenerate = "https://cloud.leonardo.ai/api/rest/v1/generations";
        
            const payloadGenerate = {
                "height": 512,
                "modelId": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Setting model ID to Leonardo Creative
                "prompt": "An oil painting of a cat",
                "width": 512,
                "imagePrompts": [imageId] // Accepts an array of image IDs
            };
        
            // return fetch(urlGenerate, {
            //     method: 'POST',
            //     headers: headers,
            //     body: JSON.stringify(payloadGenerate)
            // });
            leonardoai.auth('80849ed3-cfad-4f6e-b241-8b15cf35178a');
            leonardoai.createGeneration({
                "height": 512,
                "modelId": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Setting model ID to Leonardo Creative
                "prompt": "An oil painting of a cat",
                "width": 512,
                "imagePrompts": [imageId] // Accepts an array of image IDs
            })
        }).then(response => {
            console.log("url generated", response);
            return response;
        }).then((datas) => {
            const generationId = "99ce0d803e192d7edf6328a25087070a";
        
            const urlGetGeneration = `https://cloud.leonardo.ai/api/rest/v1/generations`;
        
            return new Promise(resolve => setTimeout(resolve, 20000)).then(() => {
                return fetch(urlGetGeneration, {
                    method: 'GET',
                    headers: headers
                });
            });
        })
        .then(response => {
            "final", response
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        
              
})

let image_id
app.post("/im", async(req,res)=>{
    const authorization = `Bearer 80849ed3-cfad-4f6e-b241-8b15cf35178a`;
    
    const headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": authorization
    };
    
    // Get a presigned URL for uploading an image
    const url = "https://cloud.leonardo.ai/api/rest/v1/init-image";
    
    const payload = { "extension": "jpg" };
    
    axios.post(url, payload, { headers })
        .then(response => {
            console.log("Get a presigned URL for uploading an image:",response);
            
            // Upload image via presigned URL
            const fields = JSON.parse(response.data.uploadInitImage.fields);
            const uploadUrl = response.data.uploadInitImage.url;
            image_id = response.data.uploadInitImage.id;
    
            const imageFilePath = path.join(__dirname, 'img', 'blog1.jpg');
            const formData = new FormData();
            for (const key in fields) {
                formData.append(key, fields[key]);
            }
            formData.append('file', fs.createReadStream(imageFilePath));
    
            return axios.post(uploadUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        })
        .then(response => {
            console.log("Upload image via presigned URL:",response);
            
            // Generate with Image to Image
            const generationUrl = "https://cloud.leonardo.ai/api/rest/v1/generations";
            const generationPayload = {
                "height": 512,
                "modelId": "1e60896f-3c26-4296-8ecc-53e2afecc132", // Setting model ID to Leonardo Diffusion XL
                "prompt": "An oil painting of a cat",
                "width": 512,
                "init_image_id": image_id,  // Only allows for one Image
                "init_strength": 0.5  // Must float between 0.1 and 0.9
            };
    
            return axios.post(generationUrl, generationPayload, { headers });
        })
        .then(response => {
            console.log("Generation of Images using Image to Image",response.status);
            
            // Get the generation of images
            console.log(response)
            const generation_id = response.data.sdGenerationJob.generationId;
            console.log(generation_id)
            const getGenerationUrl = `https://cloud.leonardo.ai/api/rest/v1/generations/44a9c2ee-1a51-4f45-b7cb-15fc5b701b99`;
    
           return axios.get(getGenerationUrl, { headers });
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    
    
})


app.post("/enhance",async(req,res)=>{
    const {prompt} = req.body

    leonardoai.auth('80849ed3-cfad-4f6e-b241-8b15cf35178a');
    leonardoai.promptImprove({prompt})
    .then(({ data }) => {
        console.log(data)
    res.status(200).send({data})
    })
    .catch(err => console.error(err));
})

app.post("/update-credit",(req,res)=>{
    const {email,credits} = req.body

    console.log(email, credits)

    User.findOneAndUpdate({email}, {credits}).then((data)=>{
        res.status(200).json({msg:" credite updated successfully", success: true})
    }).catch((err)=>{
        console.log(err)
        res.status(200).json({msg: "err in updating credits", err})
    })
})

app.post("/addcredits", async(req,res)=>{
    const {email,credits} = req.body;

    console.log(email, credits)

   await User.findOneAndUpdate({email}, {credits}).then((data)=>{
    sendToken(email, credits)
        res.status(200).json({msg:" credite updated successfully", success: true})
    }).catch((err)=>{
        console.log(err)
        res.status(200).json({msg: "err in updating credits", err})
    })


})

app.post("/history", async(req,res)=>{
    const {imgurl, prompts, email} = req.body;
    const userData = await User.findOne({email})
    if(userData){
        imgurl.map(async(el)=>{
         const user = await userData.addhistory(el?.url, prompts)
        })
        await userData.save()
    }
    res.status(200).send({imgurl, prompts})
})

app.post("/payment", async(req,res)=>{
    const {amount,currency,receipt, notes}  = req.body;      
        console.log({amount,currency,receipt, notes})
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          //STEP 3 & 4: 
          if(!err){
            console.log(order)
            res.json(order)}
          else{
            res.send(err);}
        }
    )
})

app.post('/verify-payment', async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log({ razorpay_order_id, razorpay_payment_id, razorpay_signature })

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Payment is verified
            console.log("Payment verified successfully")

            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            console.log("Invalid payment signature")
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post("/subscription", async(req,res)=>{
    const {subscription, credits, email} = req.body;
    sendSubscription(email,subscription)
    await User.findOneAndUpdate({email}, {subscription, credits}).then(()=>{

        res.status(200).send({msg : "subscriptions and credit stored successfully"})
        
    }).catch((err)=>{
        console.log(err)
        res.status(404).send(err)
    })



})

app.get("/getuser", async(req,res)=>{
    const user = await User.find()
    res.status(200).send({user})
})

app.get("/byemail/:email", async(req,res)=>{
    const {email} = req.params;
    const user = await User.findOne({email})
    res.status(200).send({user})
})

// app.post("/upload-blog",upload.single('image'), (req,res)=>{
//     console.log(req.file)
//     res.status(200).send({msg: "img stored in multer", file: req.file?.filename})
// })

app.post("/post-blog",async(req,res)=>{
    console.log(req.body)
    try{
        const blog = await Blog(req.body)
        await blog.save()
        res.status(200).send({msg: "blog add successfully"})
    }catch(err){
        console.log(err)
    }
})

app.get("/get-blog/:id",async(req,res)=>{
    const {id} = req.params
   const blog = await Blog.findById(id)
   res.status(200).send({blog})
})

app.get("/all-blog",async(req,res)=>{
    const blog = await Blog.find()
    res.status(200).send({blog})
})

app.post("/contacus",async(req,res)=>{
    const {names, email, subject, message} = req.body

    const userData = await Contact({names, email, subject, message})

    await userData.save()

    res.status(200).send({msg: "complain send successfully !"})
})

app.get("/contact", async(req,res)=>{
    const contacts = await Contact.find()

    res.status(200).send({contacts})
})

app.post("/post-review",async (req,res)=>{
    try{
        const { name, email, rates, message } = req.body
        const reviewData = await Review({ name, email, rates, message })
        await reviewData.save()

        res.status(200).send({msg: "review stored successfully" })
    }catch(err){
        res.status(404).send(err)
    }
})


app.get("/get-review",async(req,res)=>{
    const reviewData = await Review.find()
  
    res.status(200).send(reviewData)
  })


app.delete("/delete-review/:id",async(req,res)=>{
    const {id} = req.params

    await Review.findByIdAndDelete(id)

    res.status(200).send({msg: "review deleted successfully !"})
})
  
// const mongoose = require('mongoose');
app.post("/update-review", async (req, res) => {
    const { id } = req.body;

  
    try {
         await Review.findByIdAndUpdate(id,{approve: true})
        // if (updatedReview.modifiedCount === 0) {
        //     return res.status(404).send({ msg: "Review not found!" });
        // }

        res.status(200).send({ msg: "Review updated successfully!" });
    } catch (err) {
        console.error("Error during update:", err);
        res.status(500).send({ msg: "Server error" });
    }
});




app.get('/auth/callback/failure', (req, res) => {
    res.send("Error")
})


app.listen(3000, () => {
    console.log("server is running")
})