class AppException(Exception):
    """Base class for handled application errors, returned as a clean JSON envelope
    instead of an unhandled 500 traceback."""

    status_code = 400
    message = "Invalid request."

    def __init__(self, message: str | None = None):
        self.message = message or self.message
        super().__init__(self.message)


class InvalidInputException(AppException):
    status_code = 422
    message = "One or more input values are invalid for scoring."
