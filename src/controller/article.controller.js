import articleService from "../services/articles.service.js";

const getArticles = async (req, res) => {
  try {
    let articles = await articleService.findAllService();
    const serverUrl = req.protocol + "://" + req.get("host");
    articles = articles.map((article) => {
      if (article.image) {
        article.image = `${serverUrl}/article/image/${article._id}`;
      }
      return article;
    });

    if (!articles) articles = [];

    res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getImage = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleService.findByIdService(id);

    if (!article || !article.image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const base64Data = article.image;
    const imgBuffer = Buffer.from(base64Data, "base64");

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": imgBuffer.length,
    });
    res.end(imgBuffer);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addArticle = async (req, res) => {
  try {
    const requiredFields = ["title", "text"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    if (!req.file && !req.body.video) {
      return res.status(400).json({ error: "Please upload an image or add a video link in the body" });
    }

    let article = req.body;

    if (req.file) {
      const base64Data = req.file.buffer.toString('base64');
      article = {...article, image: base64Data}
    }
 
    article = await articleService.createService(article);

    res.status(201).json({
      message: "Article registered successfully",
      id: article._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: `Please add the article id as a request param` });
    }

    const requiredFields = ["title", "text"];

    for (const field of requiredFields) {
      if (!req.body[field] && !req.file) {
        return res
          .status(400)
          .json({ error: `Please add the field ${field} or upload an image` });
      } else {
        break;
      }
    }

    const { title, text, video } = req.body;
    let base64Data;

    if (req.file) {
      base64Data = req.file.buffer.toString('base64');
    }

    const updatedData = {};
    if (title) updatedData.title = title;
    if (text) updatedData.text = text;
    if (video) updatedData.video = video;
    if (base64Data) updatedData.image = base64Data;

    const result = await articleService.updateService(
      id,
      updatedData
    );

    if (!result) {
      res.status(404).json({ message: "Article not found" });
    } else {
      res
        .status(204)
        .json({ message: "Article updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: `Please add the article id as a request param` });
    }

    const result = await articleService.deleteService(id);

    if (!result) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.status(204).json({ menssage: "Article succesfully deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getArticles,
  addArticle,
  deleteArticle,
  updateArticle,
  getImage,
};
