export const getVariantFormStatus = (status: string) => {
  switch (status) {
    case 'completed':
      return 'completed'
    case 'withdrawn':
      return 'neutral'
    default:
      return 'success'
  }
}
