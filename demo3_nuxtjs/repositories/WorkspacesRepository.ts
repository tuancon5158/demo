import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  I_Get_Workspace_Response_Data,
  I_Post_Workspace_Response_Data,
  I_Register_Workspace_Response_Data,
  I_Response_Type
} from '~/types/schema/response'
import {
  I_WorkspaceRequest,
  I_Workspace_Register_Request,
  I_Workspace_Get_Request
} from '~/types/schema/workspace'

const resource = '/workspaces'

export default ($axios: NuxtAxiosInstance) => ({
  // [GET] get workspace list of user
  getWorkspaces(requestParams: I_Workspace_Get_Request) {
    return $axios.$get<I_Response_Type<I_Get_Workspace_Response_Data>>(`${resource}`, {
      params: requestParams
    })
  },

  // [GET] get workspace detials
  getWorkspacesDetails(workspaceId: string) {
    return $axios.$get(`${resource}/${workspaceId}`)
  },

  // [GET] get workspace detials for public
  getWorkspacesDetailsPublic(workspaceId: string) {
    return $axios.$get(`${resource}/${workspaceId}/profile`)
  },

  // [POST] post workspace
  postWorkspaces(inputData: I_WorkspaceRequest) {
    return $axios.$post<I_Response_Type<I_Post_Workspace_Response_Data>>(`${resource}`, {
      ...inputData
    })
  },

  registerWorkspaces(inputData: I_Workspace_Register_Request) {
    return $axios.$patch<I_Response_Type<I_Register_Workspace_Response_Data>>(`${resource}`, {
      ...inputData
    })
  },

  // [DELETE] post workspace
  deleteWorkspaces(workspaceId: string) {
    return $axios.$delete(`${resource}/${workspaceId}`)
  }
})
