export default {
    Query: {
        seasonProgression: async (parent, args, context, info) => {
            let progression = 0
            switch (args.data.type) {
                case "MANGA":
                    const sFragment = `fragment ProgressionMangas on Progression { avancement manga { season { chapterCount }} }`
                    const mangas = await context.prisma.progressions({
                        where: {
                            user: {
                                id : args.data.userID
                            },
                            manga: {
                                url_contains: args.data.progressURL + "/"
                            }
                        }
                    }).$fragment(sFragment)
                    if (mangas.length) {
                        mangas.forEach((manga) => {
                            progression += manga.avancement
                        });
                    }
                    if (mangas.length) {
                        progression = progression / mangas[0].manga.season.chapterCount
                    }
                    console.log(progression)
                    break;
                case "SEASON":

                    break;
                default:
                    progression = 0
                    break;
            }

            return {
                progression: progression
            }
        }
    },
    Mutation: {
        
    }
}
