const router = require("express").Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (Number(req.body.userId) === Number(req.params.id) || req.body.isAdmin) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("自分のアカウントのみ更新できます");
  }
});

// ユーザー情報の削除
router.delete("/:id", async (req, res) => {
  if (Number(req.body.userId) === Number(req.params.id) || req.body.isAdmin) {
    try {
      await prisma.user.delete({
        where: { id: Number(req.params.id) }
      });
      res.status(200).json("アカウントが削除されました");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("自分のアカウントのみ削除できます");
  }
});

// ユーザー情報の取得
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    let user;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    } else if (username) {
      user = await prisma.user.findUnique({ where: { username } });
    }
    if (!user) {
      return res.status(404).json("ユーザーが見つかりません");
    }
    const { password, ...other } = user;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if (Number(req.body.userId) !== Number(req.params.id)) {
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
      const currentUser = await prisma.user.findUnique({ where: { id: Number(req.body.userId) } });
      if (!user || !currentUser) {
        return res.status(404).json("ユーザーが見つかりません");
      }
      let followers = user.followers ? JSON.parse(user.followers) : [];
      let followings = currentUser.followings ? JSON.parse(currentUser.followings) : [];
      if (!followers.includes(req.body.userId)) {
        followers.push(req.body.userId);
        followings.push(req.params.id);
        await prisma.user.update({
          where: { id: Number(req.params.id) },
          data: { followers: JSON.stringify(followers) }
        });
        await prisma.user.update({
          where: { id: Number(req.body.userId) },
          data: { followings: JSON.stringify(followings) }
        });
        res.status(200).json("フォローしました");
      } else {
        res.status(403).json("すでにフォローしています");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("自分自身はフォローできません");
  }
});

// ユーザーのアンフォロー
router.put("/:id/unfollow", async (req, res) => {
  if (Number(req.body.userId) !== Number(req.params.id)) {
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
      const currentUser = await prisma.user.findUnique({ where: { id: Number(req.body.userId) } });
      if (!user || !currentUser) {
        return res.status(404).json("ユーザーが見つかりません");
      }
      let followers = user.followers ? JSON.parse(user.followers) : [];
      let followings = currentUser.followings ? JSON.parse(currentUser.followings) : [];
      if (followers.includes(req.body.userId)) {
        followers = followers.filter(id => id !== req.body.userId);
        followings = followings.filter(id => id !== req.params.id);
        await prisma.user.update({
          where: { id: Number(req.params.id) },
          data: { followers: JSON.stringify(followers) }
        });
        await prisma.user.update({
          where: { id: Number(req.body.userId) },
          data: { followings: JSON.stringify(followings) }
        });
        res.status(200).json("アンフォローしました");
      } else {
        res.status(403).json("このユーザーをフォローしていません");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("自分自身はアンフォローできません");
  }
});

module.exports = router;