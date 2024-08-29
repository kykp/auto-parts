export const ArticleCustom = (props) => {
  const {value} = props;
  const row = value?.toUpperCase();
  
  return (
    <span>{row}</span>
  )
}
