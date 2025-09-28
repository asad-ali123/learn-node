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
    createdBy: req.user?._id,
  });

  // return res.json({ shortId: shortId, saved: newUrl });
  const allUrls = await URL.find({});
  return res.render("home", { Id: shortId, urls: allUrls });
}

export async function handleGetAllUrl(req, res) {
  const allData = await URL.find({});
  return res.json({ all: allData });
}

export async function handleGetUrlAndUpdate(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        // visitHistory: { timestemp: Date.now().toLocaleString() },
        visitHistory: { timestemp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

export async function handleGetAnalytic(req, res) {
  const shortId = req.params.id;
  const result = await URL.findOne({ shortId });
  res.json({
    TotalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}
