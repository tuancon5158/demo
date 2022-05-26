import CategoriesRepository from '../CategoriesRepository'
import TagsRepository from '../TagsRepository'
import AuthRepository from '../AuthRepository'
import FileRepository from '../FileRepository'
import UsersRepository from '../UsersRepository'
import SpacesRepositor from '../SpacesRepository'
import SpacesForPersonalRepository from '../SpacesForPersonalRepository'
import SpaceFavoriteRepository from '../SpaceFavoriteRepository'
import ContactRepository from '../ContactRepository'
import NewsRepository from '../NewsRepository'
import CloudFrontRepository from '../CloudFrontRepository'
import WorkspacesRepository from '../WorkspacesRepository'
import BelongSpacesRepository from '../BelongSpacesRepository'
import MembersRepositoy from '../MembersRepositoy'
import PlanRepository from '../PlanRepository'
// import TicketRepository from '../TicketRepository'
import SpaceTicketsRepository from '../SpaceTicketsRepository'

const repositories = {
  categories: CategoriesRepository,
  tags: TagsRepository,
  auth: AuthRepository,
  file: FileRepository,
  users: UsersRepository,
  spaces: SpacesRepositor,
  spaceFavorites: SpaceFavoriteRepository,
  spacesForPersonal: SpacesForPersonalRepository,
  news: NewsRepository,
  contact: ContactRepository,
  cloudFront: CloudFrontRepository,
  workspaces: WorkspacesRepository,
  belongSpaces: BelongSpacesRepository,
  members: MembersRepositoy,
  plan: PlanRepository,
  // ticket: TicketRepository,
  spaceTickets: SpaceTicketsRepository
} as {
  [key: string]: any
}

export const RepositoryFactory = {
  get: (name: string) => repositories[name]
}
