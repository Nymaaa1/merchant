export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum Vat {
  Payer = "payer",
  NotPayer = "not_payer",
  FreePayer = "free_payer",
}

export enum ContentReportStatus {
  Created = "Created",
  Requested = "Requested",
  Confirmed = "Confirmed",
}

export enum Resource {
  list = "list",
  create = "create",
  delete = "delete/:uuid",
  update = "update/:uuid",
  cms = "cms",
  empty = "",
}

export enum CreateButtonType {
  create = 1,
  update = 2,
  subUpdate = 3,
  approve = 4,
}


