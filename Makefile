ifeq ($(OS),Windows_NT)
    RM = cmd.exe /C del /Q
else
    RM = rm -v
endif

.PHONY: build
build: clean
	@zip -rv check-noai-tag.zip . -x pages/* pages/ LICENSE README.md images/icon.png images/noai.png images/search.png

.PHONY: clean
clean:
	@$(RM) check-noai-tag.zip