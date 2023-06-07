import { newsAction } from '../../app/Redux/Store/newsPanel';
import NewsList from '../../entities/NewsList/NewsList';
import { NewsApi } from '../../shared/api/NewsApi';
import useQuery from '../../shared/hooks/useQuery';
import './NewsPage.scss';

const NewsPage = () => {
    
    useQuery({callback: newsAction, request: NewsApi})
    document.title="Новости"
    return (
        <div className="NewsPage">
            <h1>Новости</h1>
            <NewsList />
        </div>
    )
}

export default NewsPage