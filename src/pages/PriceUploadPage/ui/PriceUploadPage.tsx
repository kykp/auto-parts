import {Container} from "@/shared/ui/Container";
import {Content} from "@/shared/ui/Content";
import {ExcelUploader} from "@/widgets/ExcelUploader";
import {Section} from "@/shared/ui/Section";
import {lang} from "@/shared/consts/lang.ts";

export const PriceUploadPage = () => {
  return (
    <Container size='l'>
      <Content filledHeight>
        <Section.Header>
          <Section.Title title={lang.title.uploadingXLSXData} isBack/>
        </Section.Header>
        <ExcelUploader/>
      </Content>
    </Container>
  )
}
