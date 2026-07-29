from app.utils.image import save_image
from app.services.vision_service import vision_service
from app.services.llm_service import llm_service


class PipelineService:

    async def process(
        self,
        image,
        location,
        event_time,
        reporter_note,
    ):

        image_path = save_image(image)

        vision_result = await vision_service.analyze(image_path)

        llm_result = await llm_service.analyze(
            vision_result=vision_result,
            location=location,
            event_time=event_time,
            reporter_note=reporter_note,
        )

        return {
            "image_path": image_path,
            "result": llm_result,
        }


pipeline = PipelineService()