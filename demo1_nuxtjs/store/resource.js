export const state = () => ({
  policyRoles: [],
  policyModelNames: [],
})

export const mutations = {
  SET_POLICY_ROLES(state, payload) {
    state.policyRoles = payload
  },
  SET_POLICY_MODEL_NAMES(state, payload) {
    state.policyModelNames = payload
  },
}
