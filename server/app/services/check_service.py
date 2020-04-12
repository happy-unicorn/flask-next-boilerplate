class CheckService:
    @staticmethod
    def fields_handle_checks(checks, error):
        fields = {}
        for key, item in checks.items():
            if item['check']:
                fields[key] = item['field_on_error']
        if len(fields) != 0:
            raise error(fields)

    @staticmethod
    def handle_checks(checks, error):
        if any(checks):
            raise error
