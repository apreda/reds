import type { Metadata } from "next";
import Link from "next/link";
import Tee from "@/components/Tee";
import { getTeam } from "@/lib/teams";

export const metadata: Metadata = {
  title: "The Oakland Story",
  description: "How a $5 green shirt and a reverse boycott turned one word into a fan movement.",
};

export default function Story() {
  const oak = getTeam("oakland")!;
  return (
    <div className="wrap">
      <div className="prose">
        <span className="eyebrow" style={{ display: "block", marginTop: 40 }}>
          Where the shirt comes from
        </span>
        <h1 className="display page-title" style={{ marginTop: 8 }}>
          One word. 27,759 people.
        </h1>
        <div style={{ background: "var(--tile)", padding: "30px 18%", margin: "0 0 28px" }}>
          <Tee team={oak} />
        </div>
        <p>
          By the spring of 2023, Oakland fans had spent years watching their team get stripped down, their ballpark left
          to decay, and their owner, John Fisher, shop the franchise to other cities. When the A&rsquo;s announced a land
          deal in Las Vegas that April, most people assumed the fans would do what fans usually do: stay home.
        </p>
        <p>They did the opposite.</p>

        <h2>The reverse boycott</h2>
        <p>
          The fan group Oakland 68s organized a <em>reverse</em> boycott for a Tuesday night game on June 13, 2023. The
          idea: pack the Coliseum and prove the team could thrive in Oakland &mdash; under an owner who wanted to be
          there. They raised more than $27,000 from fans and teamed up with local clothing brand Oaklandish to produce
          kelly-green T-shirts with a single word on the front, sold for $5 each. Roughly 7,000 were handed out.
        </p>
        <blockquote>&ldquo;Sell! Sell! Sell!&rdquo;</blockquote>
        <p>
          27,759 people showed up &mdash; one of the biggest crowds of the season, on a weeknight, for a team on pace for
          one of the worst records in modern baseball. The chant rolled around the stadium all night. The A&rsquo;s even
          won. Photos of a sea of green SELL shirts ran everywhere, and later that year the Baseball Hall of Fame added
          one of the shirts to its collection in Cooperstown.
        </p>

        <h2>What happened next</h2>
        <ul className="timeline">
          <li>
            <b>Apr 2023</b>
            <span>A&rsquo;s announce a land agreement for a stadium in Las Vegas.</span>
          </li>
          <li>
            <b>Jun 13, 2023</b>
            <span>The reverse boycott. 27,759 fans, thousands of green SELL shirts.</span>
          </li>
          <li>
            <b>Nov 2023</b>
            <span>MLB owners unanimously approve the move to Las Vegas.</span>
          </li>
          <li>
            <b>Sep 2024</b>
            <span>The A&rsquo;s play their final game at the Oakland Coliseum.</span>
          </li>
          <li>
            <b>2025&ndash;</b>
            <span>The team plays in West Sacramento while a Las Vegas ballpark is built.</span>
          </li>
        </ul>
        <p>
          The shirt didn&rsquo;t save baseball in Oakland. But it did something rare: it made an owner&rsquo;s
          choices impossible to ignore, on national TV, in front of his own ballpark. It showed that fans are not the
          problem &mdash; and gave every one of them a way to say so without saying a word.
        </p>

        <h2>Why every city</h2>
        <p>
          Oakland isn&rsquo;t the only fan base that feels this way. Payrolls slashed while ticket prices climb. Stadium
          ultimatums. Relocation threats. Years of losing with no plan to stop. If your owner has stopped listening, the
          message is the same everywhere &mdash; so we made the shirt for every MLB, NFL, NBA and NHL city.
        </p>
        <p>
          Every design is just SELL and your city in your team&rsquo;s colors. No logos, no team names. Wear it to the
          game. Get your section to wear it. One shirt is a complaint. Ten thousand is a headline.
        </p>
        <p style={{ margin: "32px 0" }}>
          <Link href="/shop" className="btn" style={{ textDecoration: "none" }}>
            Find your city
          </Link>
        </p>
        <p className="sources">
          Sources:{" "}
          <a href="https://www.kqed.org/news/11952845/oakland-as-fans-swing-to-save-oakland-baseball">KQED</a>,{" "}
          <a href="https://www.nbcsports.com/mlb/news/as-fans-come-out-en-masse-for-reverse-boycott-and-tell-owner-john-fisher-to-sell">
            NBC Sports / AP
          </a>
          ,{" "}
          <a href="https://www.reviewjournal.com/sports/athletics/oakland-as-fan-made-sell-t-shirt-heading-to-cooperstown-2803270/">
            Las Vegas Review-Journal
          </a>
          ,{" "}
          <a href="https://www.cbsnews.com/sanfrancisco/news/oakland-as-athletics-reverse-boycott-coliseum-largest-crowd/">
            CBS News Bay Area
          </a>
          . The original shirt was made by Oakland 68s and Oaklandish; Sell The Team is an independent project and is
          not affiliated with either.
        </p>
      </div>
    </div>
  );
}
