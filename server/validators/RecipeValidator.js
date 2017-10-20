export default class RecipeValidator {
  static allowUpdate(request, response, userId) {
    if (request.loggedInUser.id !== parseInt(userId)) {
      return false;
    }
    return true;
  }
  static allowDelete(request, response, userId) {
    if (request.loggedInUser.id !== parseInt(userId)) {
      return false;
    }
    return true;
  }
}
