export class BlogPostHelper{
    static createSlug(title: string): string{
        //Ex:
        // Title : This is a title for post
        //Result : this-is-a-title-for-post-123
        const slug = title.toLowerCase().replace(/\s+/g, '-');
        const randomThreeDigitNumber = Math.floor(Math.random()*1000)
        return `${slug}-${randomThreeDigitNumber}`
    }
}