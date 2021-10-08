import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs"

const searchCode = async(req: NextApiRequest, res : NextApiResponse) => {
    if (req.method === "POST") {
        const body = JSON.parse(req.body)

        const languages = fs.readdirSync(join(__dirname, 'codes'))

        const snippets = []

        if (!body.query || body.query == "") {
            return res.status(200).json({
                response: []
            })
        }

        languages.map((lang) => fs.readdirSync(join(__dirname, 'codes', lang), {withFileTypes:true}).map((name) => {
            if (!name.isDirectory()) snippets.push(`${lang} / ${name.name}`)
            else snippets.push(`${lang} / ${name.name} ISDIR`)
        }))

        return res.status(200).json({
            response: snippets.filter((e) => e.toLowerCase().replace(" ", "").includes(body.query.toLowerCase().replace(" ", "")))
        })

    } else {
        return res.status(405).json({
            message: "method not allowed"
        })
    }
}

export default searchCode