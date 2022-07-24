const router = require('express').Router();
const fs = require('fs');
const pdfParse = require('pdf-parse');

router.post('/', (req, res) => {
  
    getPdf(req.files.file.data, req.body.skill).then(x => {
        res.status(200).send({ message: "success", data: x });
    }).catch((err)=>{
        res.status(500).send({ message: "Internal Server Error" })
        })
})

const getPdf = async (file,skill) => {
    
    try {
        let pdfExtract = await pdfParse(file);
        let extract = pdfExtract.text;
        let words = extract.split(/[,.\n\s+\t+]/)
        let dict = {};
        words.forEach((word, i) => {
            dict[word.toLowerCase()] = i;
        });
        skill = skill.toLowerCase();
        let skills = skill.split(/\s+/);
        let score, count = 0;
        skills.forEach(sk => {
            if (dict.hasOwnProperty(sk)) {
                count += 1;
            }
        });
        score = count / skills.length;
        return score * 100;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = router;