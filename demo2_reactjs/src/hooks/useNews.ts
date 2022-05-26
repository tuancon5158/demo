import { newsServices } from '../services/news'

export const useNews = (): { [key: string]: Function } => {
	// const [data, setData] = useState([])

	const getNews = async (): Promise<any> => {
		try {
			;(await newsServices.getList({})) as any
		} catch (e) {
			//
		}
	}
	const getNewsDetail = async (idNews: string): Promise<any> => {
		try {
			const res = (await newsServices.getDetail(idNews)) as any
			return res
		} catch (e) {
			//
			return e
		}
	}
	const deleteNews = async (idNews: number): Promise<any> => {
		try {
			;(await newsServices.remove(idNews)) as any
		} catch (e) {
			//
		}
	}

	return { getNews, getNewsDetail, deleteNews }
}
