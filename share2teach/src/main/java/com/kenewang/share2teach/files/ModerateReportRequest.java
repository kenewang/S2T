package com.kenewang.share2teach.files;

public class ModerateReportRequest {
    private Long reportId;
    private String action;

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
