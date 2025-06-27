const router = require("express").Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// 投稿を作成する
router.post("/", async (req, res) => {
    try {
        const { userId, desc, img } = req.body;
        const savedPost = await prisma.post.create({ data: {userId, desc, img }});
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
        const post = await prisma.post.findUnique({ 
            where: { id: Number(req.params.id) },
            include: {likes: true}
         });
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) =>{
    try{
        const postId = Number(req.params.id);
        const userId = Number(req.body.userId);

        //すでにLikeが存在しているかを確認
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: { userId, postId}
            }
        });

        if(!existingLike){
            //イイネの追加（createdAtは自動で記録される）
            await prisma.like.create({
                data: {
                    userId,
                    postId
                    // createdAtはスキーマの@default(now())で自動
                }
            });
            return res.status(200).json("投稿にいいねを押しました！");
        }else{
            //イイネの削除
            await prisma.like.delete({
                where:{
                    userId_postId: {userId, postId}
                }
            });
            return res.status(200).json("投稿のいいねを外しました");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

// プロフィール専用のタイムラインの取得
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { username: req.params.username } });
        if (!user) return res.status(404).json("ユーザーが見つかりません");
        const posts = await prisma.post.findMany({ 
            where: { userId: user.id },
            include: {likes:true}
         });
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
        const userPosts = await prisma.post.findMany({ 
            where: { userId: currentUser.id },
            include: {likes: true}
        });
        const followings = currentUser.followings ? JSON.parse(currentUser.followings) : [];
        const friendPosts = await Promise.all(
            followings.map(friendId => {
                return prisma.post.findMany({ 
                    where: { userId: Number(friendId) }, 
                    include: {likes: true}
                });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;