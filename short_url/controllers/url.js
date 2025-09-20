import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function handelGenerateShortUrl(req, res) {
  const shortId = nanoid(8);
  const body = req.body;
  if (!body.url)
    return res
      .status(400)
      .json({ error: "Url is required! please Add url...." });

  const newUrl = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ shortID: shortId, saved: newUrl });
}

export async function handleGetAllUrl(req, res) {
  const allData = await URL.find({});
  return res.json({ all: allData });
}

export async function handleGetUrlAndUpdate(req, res) {
  const shortId = req.params.shortId;
  await URL.findOneAndUpdate(shortId)

}
