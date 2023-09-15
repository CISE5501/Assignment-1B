import { Article } from "@/src/schema/article";
import { GetServerSideProps } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import ArticleItem from "@/components/ArticleItem";
interface IndexProps {
    data: { articles: Article[] }
}

const headerList = ["Title",
    "Author(s)",
    "Date",
    "Journal",
    "Volume",
    "Issue",
    "Page Range",
    "DOI",
    "Keywords",
    "Abstract"]

const Index = ({ data }: IndexProps) => {
    const articleElements = data.articles.map((item, index) => (
        <ArticleItem article={item} key={index} />
    ))

    return (
        <Container>
            {articleElements.length > 0 ? (
                <Table className="mb-5">
                    <thead>
                        <tr>
                            {headerList.map((entry, entryID) => <th key={entryID}>{entry}</th>)}
                        </tr>
                    </thead>

                    <tbody>{articleElements}</tbody>
                </Table>
            ) : (
                <div>No Articles!</div>
            )}
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('https://backend-44r1qkg04-janenotjung-hue.vercel.app/articles/')
    const data = await res.json()
    //console.log(data)
    return {
        props: {
            data
        }
    }
}

export default Index;