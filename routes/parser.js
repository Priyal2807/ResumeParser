const multer = require('multer');
const router = require('express').Router();
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const pdfParse = require('pdf-parse');

router.post('/', upload.single('file'), (req, res) => {
    getPdf(req.file.path);
    res.send({message:"sucess"})
})

const getPdf = async (file) => {
    let readFile = fs.readFileSync(file);
    try {
        let pdfExtract = await pdfParse(readFile);
        let extract = pdfExtract.text;
        let words = extract.split(/[,.\n\s+\t+]/);
        let dict = {};
        words.forEach((word, i) => {
            dict[word] = i;
        });
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = router;