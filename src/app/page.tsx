import {Button} from "@/components/ui/button";
import H1 from "@/components/ui/Typography/h1";
import H2 from "@/components/ui/Typography/h2";
import H3 from "@/components/ui/Typography/h3";
import H4 from "@/components/ui/Typography/h4";
import Large from "@/components/ui/Typography/large";
import Lead from "@/components/ui/Typography/lead";
import Muted from "@/components/ui/Typography/muted";
import P from "@/components/ui/Typography/p";
import Small from "@/components/ui/Typography/small";
import Underlined from "@/components/ui/Typography/underlined";

export default async function Home() {

    return (
        <main>
            <H1>Titre 1</H1>
            <H2>Titre 2</H2>
            <H3>Titre 3</H3>
            <H4>Titre 4</H4>

            <Large>Texte large</Large>
            <Lead>Texte Lead</Lead>
            <Muted>Texte muted</Muted>
            <P>Lorem Ipsum <Underlined>underlined</Underlined> plus maintenant</P>
            <P>Texte underlined</P>
            <Small>Text small</Small>

            <br/>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="primary-outline">Primary Outline</Button>
            <Button variant="secondary-outline">Secondary Outline</Button>
        </main>
    );
}
