const router = require("express").Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// 投稿を作成する
router.post("/", async (req, res) => {
    try {
        const savedPost = await prisma.post.create({ data: req.body });
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿を更新する
router.put("/:id", async (req, res) => {
    try {
        const post = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
        if (post.userId === req.body.userId) {
            await prisma.post.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });
            return res.status(200).json("投稿の編集に成功しました！");
        } else {
            return res.status(403).json("ほかの人の投稿は編集できません");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿を削除する
router.delete("/:id", async (req, res) => {
    try {
        const post = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
        if (post.userId === req.body.userId) {
            await prisma.post.delete({ where: { id: Number(req.params.id) } });
            return res.status(200).json("投稿の削除に成功しました！");
        } else {
            return res.status(403).json("ほかの人の投稿は削除できません");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 特定の投稿を取得する
router.get("/:id", async (req, res) => {
    try {
        const post = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
    try {
        const post = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
        let likes = post.likes ? JSON.parse(post.likes) : [];
        if (!likes.includes(req.body.userId)) {
            likes.push(req.body.userId);
            await prisma.post.update({
                where: { id: Number(req.params.id) },
                data: { likes: JSON.stringify(likes) },
            });
            return res.status(200).json("投稿にいいねを押しました！");
        } else {
            likes = likes.filter(id => id !== req.body.userId);
            await prisma.post.update({
                where: { id: Number(req.params.id) },
                data: { likes: JSON.stringify(likes) },
            });
            return res.status(200).json("投稿のいいねを外しました");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// プロフィール専用のタイムラインの取得
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { username: req.params.username } });
        if (!user) return res.status(404).json("ユーザーが見つかりません");
        const posts = await prisma.post.findMany({ where: { userId: user.id } });
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// タイムラインの投稿を取得
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await prisma.user.findUnique({ where: { id: Number(req.params.userId) } });
        if (!currentUser) return res.status(404).json("ユーザーが見つかりません");
        const userPosts = await prisma.post.findMany({ where: { userId: currentUser.id } });
        const followings = currentUser.followings ? JSON.parse(currentUser.followings) : [];
        const friendPosts = await Promise.all(
            followings.map(friendId => {
                return prisma.post.findMany({ where: { userId: Number(friendId) } });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;