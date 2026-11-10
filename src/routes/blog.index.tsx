import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { articles } from "@/data/content";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — BiheInCourt" },
      {
        name: "description",
        content:
          "Draft article previews from BiheInCourt. All content requires verification before publication.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { lang } = useT();
  return (
    <>
      <PageHero
        eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Legal resources"}
        title={lang === "ne" ? "अनुवाद समीक्षा आवश्यक — तपाईंको यात्राको लागि लेखहरू" : "Articles for your journey."}
        desc={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — परियोजनाबाट हालको लेख ड्राफ्टहरू हेर्नुहोस्।"
            : "Browse the current article drafts from the project."
        }
      />
      <div className="container-x py-16 md:py-24">
        <p className="border-l-2 border-gold bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">
            {lang === "ne" ? "अनुवाद समीक्षा आवश्यक — प्रकाशनको लागि ड्राफ्ट सामग्री" : "Draft content — not for publication."}
          </strong>{" "}
          {lang === "ne"
            ? "परियोजनामा कुनै ग्राहक-प्रमाणित लेख उपलब्ध छैन। यी मौजुद ड्राफ्ट र मेटाडेटा प्लेसहोल्डर हुन्; पाठ, मिति र पढ्ने समय ग्राहकले प्रमाणित र स्वीकृत गर्नु अघि जाँच गर्नुपर्छ।"
            : "No client-verified articles are available in the project. These existing draft entries and their metadata are placeholders; the copy, dates, and reading times must be verified and replaced or approved by the client before publication."}
        </p>
        {articles.length > 0 ? (
          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BlogCard key={article.slug} a={article} headingLevel={2} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-dashed p-10 text-center">
            <h2 className="text-3xl">
              {lang === "ne" ? "अनुवाद समीक्षा आवश्यक — लेख यहाँ देखा पर्नेछ" : "Articles will appear here."}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — प्रकाशन अघि ग्राहकले प्रमाणित लेख सामग्री प्रदान गर्नुहोस्।"
                : "[Client to provide verified article content before publication.]"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
