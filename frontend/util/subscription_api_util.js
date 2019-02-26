export const createSubscription = (id) => {
  return $.ajax({
    method: "POST",
    url: `api/channels/${id}/subscriptions`
  })
}

export const destroySubscription = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/channels/${id}/subscriptions/1`
  })
}