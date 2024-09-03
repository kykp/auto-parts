import cls from './Loader.module.scss';

interface LoaderProps {
  progress?: number; // Процент загрузки
}

export const Loader = (props: LoaderProps) => {
  const {progress} = props;

  return (
    <div className={cls.loaderContainer}>
      <div className={cls.loader}></div>
      {progress !== undefined && (
        <div className={cls.progressText}>{progress}%</div>
      )}
    </div>
  );
};
