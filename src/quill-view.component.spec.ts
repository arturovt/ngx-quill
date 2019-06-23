import { Component, ViewChild } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuillViewComponent } from '../src/quill-view.component'

import { QuillModule } from './quill.module'

// tslint:disable:max-classes-per-file

describe('Basic QuillViewComponent', () => {
  let fixture: ComponentFixture<QuillViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        QuillModule.forRoot()
      ]
    })

    fixture = TestBed.createComponent(QuillViewComponent)
  })

  it('should render and set default snow theme class', async(async () => {
    const element = fixture.nativeElement
    fixture.detectChanges()
    await fixture.whenStable()

    expect(element.querySelectorAll('.ql-editor').length).toBe(1)
    expect(fixture.componentInstance.quillEditor).toBeDefined()
    const viewElement = element.querySelector('.ql-container.ql-snow.ngx-quill-view > .ql-editor')
    expect(viewElement).toBeDefined()
  }))
})

describe('Formats', () => {
  describe('object', () => {
    @Component({
      template: `
    <quill-view [content]="content" format="object"></quill-view>
    `
    })
    class ObjectComponent {
      @ViewChild(QuillViewComponent, {
        static: true
      }) view: QuillViewComponent | undefined
      content = [{
        insert: 'Hello'
      }]
    }

    let fixture: ComponentFixture<ObjectComponent>

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ObjectComponent],
        imports: [QuillModule]
      })

      fixture = TestBed.createComponent(ObjectComponent) as ComponentFixture<ObjectComponent>
      fixture.detectChanges()
    })
    it('should be set object', async(() => {
      const component = fixture.componentInstance

      fixture.whenStable().then(() => {
        expect(JSON.stringify(component.view!.quillEditor.getContents())).toEqual(JSON.stringify({ops: [{insert: 'Hello\n'}]}))
      })
    }))

    it('should update object content', async(() => {
      const component = fixture.componentInstance
      fixture.whenStable().then(() => {
        component.content = [{ insert: '1234' }]
        fixture.detectChanges()

        return fixture.whenStable()
      }).then(() => {
        expect(JSON.stringify(component.view!.quillEditor.getContents())).toEqual(JSON.stringify({ops: [{insert: '1234\n'}]}))
      })
    }))
  })

  describe('html', () => {
    @Component({
      template: `
    <quill-view [content]="content" format="html"></quill-view>
    `
    })
    class HTMLComponent {
      @ViewChild(QuillViewComponent, {
        static: true
      }) view: QuillViewComponent | undefined
      content = '<p>Hallo</p>'
    }

    let fixture: ComponentFixture<HTMLComponent>

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HTMLComponent],
        imports: [QuillModule]
      })

      fixture = TestBed.createComponent(HTMLComponent) as ComponentFixture<HTMLComponent>
      fixture.detectChanges()
    })
    it('should be set html', async(async () => {
      const component = fixture.componentInstance

      await fixture.whenStable()
      expect(component.view!.quillEditor.getText().trim()).toEqual('Hallo')
    }))

    it('should update html', async(async () => {
      const component = fixture.componentInstance
      await fixture.whenStable()
      component.content = '<p>test</p>'
      fixture.detectChanges()
      await fixture.whenStable()

      expect(component.view!.quillEditor.getText().trim()).toEqual('test')
    }))
  })

  describe('text', () => {
    @Component({
      template: `
    <quill-view [content]="content" format="text"></quill-view>
    `
    })
    class TextComponent {
      @ViewChild(QuillViewComponent, {
        static: true
      }) view: QuillViewComponent | undefined
      content = 'Hallo'
    }

    let fixture: ComponentFixture<TextComponent>

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TextComponent],
        imports: [QuillModule]
      })

      fixture = TestBed.createComponent(TextComponent) as ComponentFixture<TextComponent>
      fixture.detectChanges()
    })
    it('should be set text', async(async () => {
      const component = fixture.componentInstance
      await fixture.whenStable()
      expect(component.view!.quillEditor.getText().trim()).toEqual('Hallo')
    }))

    it('should update text', async(async () => {
      const component = fixture.componentInstance
      await fixture.whenStable()
      component.content = 'test'
      fixture.detectChanges()
      await fixture.whenStable()

      expect(component.view!.quillEditor.getText().trim()).toEqual('test')
    }))
  })

  describe('json', () => {
    @Component({
      template: `
    <quill-view [content]="content" format="json"></quill-view>
    `
    })
    class JSONComponent {
      @ViewChild(QuillViewComponent, {
        static: true
      }) view: QuillViewComponent | undefined
      content = JSON.stringify([{
        insert: 'Hallo'
      }])
    }

    let fixture: ComponentFixture<JSONComponent>

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [JSONComponent],
        imports: [QuillModule]
      })

      fixture = TestBed.createComponent(JSONComponent) as ComponentFixture<JSONComponent>
      fixture.detectChanges()
    })

    it('should set json string', async(async () => {
      const component = fixture.componentInstance
      await fixture.whenStable()
      await fixture.whenStable()

      expect(JSON.stringify(component.view!.quillEditor.getContents())).toEqual(JSON.stringify({ops: [{insert: 'Hallo\n'}]}))
    }))

    it('should update json string', async(async () => {
      const component = fixture.componentInstance
      await fixture.whenStable()

      component.content = JSON.stringify([{
        insert: 'Hallo 123'
      }])
      fixture.detectChanges()
      await fixture.whenStable()

      expect(JSON.stringify(component.view!.quillEditor.getContents())).toEqual(JSON.stringify({ops: [{insert: 'Hallo 123\n'}]}))
    }))
  })
})